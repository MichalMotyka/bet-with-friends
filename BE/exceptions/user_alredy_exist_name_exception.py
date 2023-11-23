class User_Alredy_Exist_Name_Exception(Exception):
    def __init__(self, name, message="User already exists in the database with name {}"):
        self.name = name
        self.message = message.format(name)
        super().__init__(self.message)