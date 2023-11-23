class UserAlredyExistEmailException(Exception):
    def __init__(self, name, message="User already exists in the database with email {}", code = "R1"):
        self.name = name
        self.code = code
        self.message = message.format(name)
        super().__init__(self.message)