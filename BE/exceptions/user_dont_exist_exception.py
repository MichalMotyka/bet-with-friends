class UserDontExistException(Exception):
    def __init__(self, name, message="User don't exists", code = "R6"):
        self.code = code
        self.name = name
        self.message = message.format(name)
        super().__init__(self.message)