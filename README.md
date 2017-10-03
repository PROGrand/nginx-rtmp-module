# NGINX-based Media Streaming Server: Dynamic PUSH support
## nginx-rtmp-module

Original functionality is all from:

### Project blog

  http://nginx-rtmp.blogspot.com

### Wiki manual

  https://github.com/arut/nginx-rtmp-module/wiki/Directives

### Additional Features

* Stream relay support for distributed
  streaming extended for push models: list of targets is dynamically loaded from local file on PUBLISH request. No server config reloading is required. Local file can be modified with any third-party system, uploaded through HTTP and etc.

### Example nginx.conf (dynamic loading from file channels.txt)

    rtmp {
        server {
                listen 1935;
                chunk_size 8192;

                application stream {
                        live on;
                        meta copy;
            						push channels.txt;
                }
        }
    }

### Example channels.txt

    rtmp://mirror1.mtbo.org/stream/streamid1
    rtmp://mirror2.mtbo.org/stream/streamid1
    rtmp://a.rtmp.youtube.com/live2/zg1y-hwh8-0fut-xxxx
