FROM jenkins/jenkins:lts

USER root
RUN apt-get update && \
    apt-get install -y docker.io tar wget gnupg  && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
# Install Trivy (latest version)

RUN wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor |  tee /usr/share/keyrings/trivy.gpg > /dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | tee -a /etc/apt/sources.list.d/trivy.list
RUN apt-get update
RUN apt-get install trivy


CMD sh -c 'dockerd > /tmp/dockerd.log 2>&1 & exec /usr/local/bin/jenkins.sh'
