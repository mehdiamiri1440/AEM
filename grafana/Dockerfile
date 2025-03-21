FROM grafana/grafana:latest

# Copy Grafana configs
COPY grafana.ini /etc/grafana/grafana.ini
COPY provisioning /etc/grafana/provisioning

# Expose Grafana port
EXPOSE 3000
