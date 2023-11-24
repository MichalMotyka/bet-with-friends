from dataclasses import dataclass
from datetime import datetime

@dataclass(order=True,frozen=True)
class Response():
    message:str
    code:str
    time_stamp:float = datetime.utcnow().timestamp()