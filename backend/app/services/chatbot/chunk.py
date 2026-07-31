class Chunk:
    def __init__(self, source_type: str, source_id: str, path: str | None, title: str, content: str):
        self.source_type = source_type
        self.source_id = source_id
        self.path = path
        self.title = title
        self.content = content

    def to_dict(self) -> dict:
        return {
            "source_type": self.source_type,
            "source_id": str(self.source_id),
            "path": self.path,
            "title": self.title,
            "content": self.content
        }