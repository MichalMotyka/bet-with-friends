class ActivationCodeInvalidException(Exception):
    def __init__(self, message = "Activation code is invalid",code = "A1"):
        self.code = code
        self.message = message
        super().__init__(self.message)