class UserAlredyExistNameException(Exception):
    def __init__(self, name, message="User already exists in the database with name {}", code = "R2"):
        self.code = code
        self.name = name
        self.message = message.format(name)
        super().__init__(self.message)