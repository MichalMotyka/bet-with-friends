from dataclasses import dataclass
from datetime import datetime
import json

@dataclass(order=True,frozen=True)
class Response():
    message:str
    code:str
    time_stamp:float = datetime.utcnow().timestamp()

    def to_json(self):
        return json.dumps({
            "message": self.message,
            "code": self.code,
            "time_stamp": self.time_stamp
        }, indent= 4)