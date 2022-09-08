FROM ubuntu:22.04

RUN apt-get update \
    && apt-get install -y ssh

COPY docker-entrypoint.sh /root/docker-entrypoint.sh
COPY id_ecdsa.pub /root/.ssh/authorized_keys

# RUN chmod 0700 /root/.ssh \
#     && chmod 0600 /root/.ssh/authorized_keys

CMD [ "sh", "/root/docker-entrypoint.sh" ]
