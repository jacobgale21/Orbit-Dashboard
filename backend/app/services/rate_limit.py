import time
from collections import defaultdict, deque
from fastapi import Depends, HTTPException, status
from app.services.services import get_current_user
from app.schemas.user_schemas import UserResponse

# user_id -> timestamps of recent calls
_hits: dict[str, deque[float]] = defaultdict(deque)

def rate_limit_chat(
    max_calls: int = 20,
    window_seconds: int = 60,
    user: UserResponse = Depends(get_current_user),
) -> UserResponse:
    now = time.monotonic()
    key = str(user.id)
    q = _hits[key]
    # remove timestamps older than the window
    while q and now - q[0] > window_seconds:
        q.popleft()
    # check if the user has exceeded the rate limit
    if len(q) >= max_calls:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Rate limit exceeded: {max_calls} requests per {window_seconds}s",
            headers={"Retry-After": str(window_seconds)},
        )
    # add the current timestamp to the queue
    q.append(now)
    return user