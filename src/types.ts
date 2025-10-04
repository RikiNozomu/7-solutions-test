interface ItemType {
  type: string;
  name: string;
}

interface ItemWithBucket extends ItemType {
  bucket: string
}
