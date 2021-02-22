#!/bin/bash

passenger start -p 80 -e production

exec "$@"