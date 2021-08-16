FROM alpine AS builder

COPY script.sh /script.sh

CMD ["/script.sh"]


FROM alpine AS pygame

COPY pygameScript.sh /pygameScript.sh

CMD ["/pygameScript.sh"]