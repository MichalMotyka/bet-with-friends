class ProfileDontExistException(Exception):
    def __init__(self, message = "Profile don't exist",code = "P1"):
        self.code = code
        self.message = message
        super().__init__(self.message)