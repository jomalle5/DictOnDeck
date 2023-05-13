import logging
import json

logging.basicConfig(filename="/tmp/template.log",
                    format='[Template] %(asctime)s %(levelname)s %(message)s',
                    filemode='w+',
                    force=True)
logger=logging.getLogger()
logger.setLevel(logging.INFO) # can be changed to logging.DEBUG for debugging issues

class Plugin:
    # A normal method. It can be called from JavaScript using call_plugin_function("method_1", argument1, argument2)
    async def findWord(text):
        j = 1
        result = list()
        while True:
            try:
                f = open("term_bank_" + str(j) + ".json")
                data = json.load(f)
                for i in data:
                    if i[0].startswith(text):
                        result.append(i)
                    elif i[1].startswith(text):
                        result.append(i)
                j = j+1
                f.close()
            except OSError:
                break
        for word in result:
            print(word)

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        logger.info("Hello World!")
    
    # Function called first during the unload process, utilize this to handle your plugin being removed
    async def _unload(self):
        logger.info("Goodbye World!")
        pass
