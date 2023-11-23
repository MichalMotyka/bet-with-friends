class User_Alredy_Exist_Email_Exception(Exception):
    def __init__(self, name, message="User already exists in the database with email {}"):
        self.name = name
        self.message = message.format(name)
        super().__init__(self.message)