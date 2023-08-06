import os
from json import JSONEncoder
import json
# The decky plugin module is located at decky-loader/plugin
# For easy intellisense checkout the decky-loader code one directory up
# or add the `decky-loader/plugin` path to `python.analysis.extraPaths` in `.vscode/settings.json`
import decky_plugin

class Entry:
    def __init__(self, expression, reading, definitionTags, rules, score, glossary, sequence, termTags):
        self.expression = expression
        self.reading = reading
        self.definitionTags = definitionTags
        self.rules = rules
        self.score = score
        self.glossary = glossary
        self.sequence = sequence
        self.termTags = termTags

class Plugin:
    # A normal method. It can be called from JavaScript using call_plugin_function("method_1", argument1, argument2)
    async def add(self, left, right):
        return "hello world"
    # ["お守り","おまもり","n","",708,["charm","amulet"],1002060,"P ichi news"]
    async def search(self, text):
        entries = list()
        i = 1
        while True:
            try:
                with open(os.path.join(decky_plugin.DECKY_PLUGIN_RUNTIME_DIR, "term_bank_" + str(i) + ".json"), "r") as f:
                    data = json.load(f)
                    for entry in data:
                        if entry[0].startswith(text):
                            entries.append(Entry(entry[0],entry[1],entry[2],entry[3],entry[4],entry[5],entry[6],entry[7]))
                        elif entry[1].startswith(text):
                            entries.append(Entry(entry[0],entry[1],entry[2],entry[3],entry[4],entry[5],entry[6],entry[7]))
                    i += 1
            except OSError as error:
                break
        entries.sort(reverse=True, key=lambda e: e.score)
        res = json.dumps([entry.__dict__ for entry in entries], ensure_ascii=False)
        return res

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        pass

    # Function called first during the unload process, utilize this to handle your plugin being removed
    async def _unload(self):
        pass

    # Migrations that should be performed before entering `_main()`.
    async def _migration(self):
        decky_plugin.logger.info("Migrating")
        # Here's a migration example for logs:
        # - `~/.config/decky-template/template.log` will be migrated to `decky_plugin.DECKY_PLUGIN_LOG_DIR/template.log`
        decky_plugin.migrate_logs(os.path.join(decky_plugin.DECKY_USER_HOME,
                                               ".config", "decky-template", "template.log"))
        # Here's a migration example for settings:
        # - `~/homebrew/settings/template.json` is migrated to `decky_plugin.DECKY_PLUGIN_SETTINGS_DIR/template.json`
        # - `~/.config/decky-template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_SETTINGS_DIR/`
        decky_plugin.migrate_settings(
            os.path.join(decky_plugin.DECKY_HOME, "settings", "template.json"),
            os.path.join(decky_plugin.DECKY_USER_HOME, ".config", "decky-template"))
        # Here's a migration example for runtime data:
        # - `~/homebrew/template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_RUNTIME_DIR/`
        # - `~/.local/share/decky-template/` all files and directories under this root are migrated to `decky_plugin.DECKY_PLUGIN_RUNTIME_DIR/`
        decky_plugin.migrate_runtime(
            os.path.join(decky_plugin.DECKY_HOME, "template"),
            os.path.join(decky_plugin.DECKY_USER_HOME, ".local", "share", "decky-template"))