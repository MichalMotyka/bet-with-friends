import json
import os

class ConfigurationManager():
    __instance = None
    __config_map = None
    
    @classmethod
    def get_instance(cls):
        if cls.__instance == None:
            cls.__instance = cls.__new__(cls)
            cls.__load_configuration(cls.__instance)
        return cls.__instance

    def __init__(self):
        raise RuntimeError("This is a Singleton, invoke get_instance() insted.")
    
    def __load_configuration(self):
        path = os.path.join(os.getcwd(),"configuration.json")
        with open(path,'r') as file: 
            self.__config_map = json.load(file)

    def get_config_by_key(self,key:str):
        keys = key.split('.')
        value = self.__config_map
        for k in keys:
            value = value.get(k)
            if value is None:
                return None
        return value

    def temp_config(self,key:str,param):
        self.__config_map[key] = param