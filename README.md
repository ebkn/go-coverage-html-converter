# Go coverege path finder

Get info from coverage profile of Go.

```sh
docker build -t go-coverage-path-finder:v0.0.1 .
docker run \
  -v $(pwd)/test/cover.html:/app/cover.html \
  go-coverage-path-finder:<tag>
```
