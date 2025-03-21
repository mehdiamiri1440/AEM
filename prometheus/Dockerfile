FROM prom/prometheus:latest

# Copy Prometheus config
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Expose Prometheus port
EXPOSE 9090

CMD ["--config.file=/etc/prometheus/prometheus.yml"]
