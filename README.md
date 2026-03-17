# Enterprise-GitOps-Platform-Automated-EKS-Infrastructure-and-3-Tier-Microservices

## More Documentation
- [Steps to run the project](steps.md)

VPC Architecture
![Architecture](images/vpc_tf.png)

EKS Architecture
![Architecture](images/eks_user_tf.png)

CI-CD Architecture
![Architecture](images/cicd.png)

# Project Overview

This project, Enterprise GitOps Platform: Automated EKS Infrastructure and 3-Tier Microservices, is an advanced version of my first DevOps project. In this implementation, the main focus was to move from a basic eksctl-based cluster setup to a more secure, scalable, and production-oriented Kubernetes platform built entirely using Infrastructure as Code (IaC) with Terraform.

The project combines custom AWS infrastructure provisioning, Amazon EKS cluster deployment, GitOps-based application delivery with Argo CD, persistent storage using AWS EBS, autoscaling mechanisms, and a canary deployment strategy for safer application releases.

This project demonstrates how a 3-tier microservices application can be deployed on a securely designed AWS infrastructure with better control over networking, access, storage, scalability, and release management.

# Detailed Explanation

## Purpose of the Project

The purpose of this project was to improve my first EKS-based DevOps project by redesigning the infrastructure in a more production-ready way. In my first project, the focus was mainly on containerization, CI/CD, and deploying the application to an EKS cluster created with eksctl.

In this second project, I focused on:

- building the infrastructure from scratch using Terraform,
- creating a secure custom VPC architecture,
- restricting access to worker nodes,
- enabling persistent storage for stateful workloads,
- implementing autoscaling at both pod and node level,
- and introducing a canary deployment model for controlled application releases.

This project helped me understand how real-world DevOps platforms are designed with not only deployment in mind, but also security, reliability, scalability, and infrastructure reproducibility.

## Infrastructure as Code with Terraform

A major improvement in this project was the transition from CLI-based infrastructure provisioning to Terraform-based Infrastructure as Code.

Instead of creating the EKS cluster using eksctl, I built the infrastructure using Terraform so that the entire environment could be version-controlled, reusable, and reproducible.

The Terraform code was designed in a structured and modular way, making it easier to manage infrastructure components and replicate similar environments in the future.

This IaC-based approach helped eliminate manual configuration and provided better control over how the infrastructure was provisioned.

## Custom AWS Network Architecture

To support the EKS platform, I built a custom multi-AZ VPC architecture across two Availability Zones.

The VPC design included:

- 2 public subnets across 2 Availability Zones
- 2 private subnets across 2 Availability Zones
- public and private route tables
- Internet Gateway for public subnet internet access
- NAT Gateway for outbound internet access from private subnets

This design ensured separation between public-facing and internal resources, which is an important principle in secure cloud architecture.

## Secure Node Placement and Access Control

One of the main security improvements in this project was the placement of the EKS worker nodes only in the private subnets.

The worker nodes were configured without public IP addresses, which means they were not directly exposed to the internet. This significantly reduced the attack surface of the cluster.

To enable administrative access in a controlled way, I configured a Bastion Host in the public subnet. The Bastion Host acted as the only entry point for SSH-based access to the private worker nodes.

This architecture ensured that:

- worker nodes remained private,
- administrative access was controlled,
- and no direct external access to the EKS nodes was allowed.

This helped me understand how to design Kubernetes infrastructure with stronger security and isolation.

## IAM and Principle of Least Privilege

I also configured the required IAM roles and policies for the infrastructure components and EKS services.

The IAM setup was designed by following the Principle of Least Privilege (PoLP), meaning each component was given only the permissions required to perform its specific task.

This included IAM configuration for:

- the EKS control plane,
- worker nodes,
- storage integration,
- and supporting services used by the cluster.

This part of the project improved my understanding of secure AWS identity and access management in a Kubernetes-based environment.

## Persistent Storage with AWS EBS

In my first project, some workloads stored data locally, which is not ideal because pods are ephemeral and nodes can also fail or be replaced.

To solve this problem in this project, I configured AWS EBS-backed persistent storage for stateful workloads running inside the cluster.

I set up the necessary infrastructure and cluster-level configuration for:

- AWS EBS CSI Driver
- IAM OIDC provider integration
- persistent storage support for Kubernetes workloads

This allowed stateful applications such as MongoDB and Jenkins to use external EBS volumes instead of relying on local pod or node storage.

This was an important improvement because it ensured that data could be retained and reused even if pods were restarted, rescheduled, or recreated.

## GitOps with Argo CD

After provisioning the infrastructure through Terraform, I integrated Argo CD with the EKS cluster to manage the deployment state of my application.

Argo CD continuously monitored the Kubernetes manifests stored in Git and synchronized them with the actual cluster state. This ensured that the cluster remained aligned with the declarative configuration stored in the repository.

By implementing GitOps in this project, I gained practical experience in:

- declarative deployment management,
- continuous synchronization,
- drift correction,
- and Git as the single source of truth for Kubernetes applications.

## Application Deployment

This project continued to use the 3-tier microservices application from my first project, but deployed it on a much stronger infrastructure foundation.

The application architecture still included:

- frontend service
- backend service
- MongoDB database

However, the supporting platform around the application was significantly enhanced through improved infrastructure, secure networking, persistent storage, and automated scaling capabilities.

## Automated Scalability

To make the platform more production-ready, I implemented a dual-layer scaling strategy.

### Horizontal Pod Autoscaler (HPA)

I used the Kubernetes Metrics Server and Horizontal Pod Autoscaler (HPA) to scale application pods based on resource usage. This allowed application workloads to adjust according to demand.

### Cluster Autoscaler

I also integrated the AWS Cluster Autoscaler so that EC2 worker nodes could scale dynamically based on cluster resource requirements.

This combination helped provide:

- application-level elasticity through HPA,
- infrastructure-level elasticity through Cluster Autoscaler,
- and better cloud cost optimization by scaling resources only when required.

## Canary Deployment Strategy

Another major enhancement in this project was the implementation of a Canary Deployment model.

Instead of shifting all traffic to a new application version at once, the canary strategy allowed a controlled rollout where only a subset of traffic was routed to the new version first.

This approach helped support:

- safer production releases,
- reduced deployment risk,
- easier rollback capability,
- and improved application availability during updates.

Implementing canary deployment gave me practical exposure to advanced deployment strategies used in modern cloud-native environments.

## End-to-End Workflow

The overall workflow of the project was as follows:

1. Terraform was used to provision a custom AWS infrastructure.
2. A multi-AZ VPC was created with public and private subnets.
3. Internet Gateway and NAT Gateway were configured for proper traffic flow.
4. EKS worker nodes were deployed only in private subnets without public IPs.
5. A Bastion Host was placed in a public subnet for controlled administrative access.
6. IAM roles and policies were configured for infrastructure and cluster services.
7. EBS storage integration was configured for persistent workloads.
8. The EKS platform was used to host the 3-tier microservices application.
9. Argo CD synchronized the application manifests from Git to the cluster.
10. HPA and Cluster Autoscaler were configured for pod and node scaling.
11. A canary deployment strategy was introduced for safer application releases.

## Key Features Demonstrated

This project demonstrates practical experience with:

- Terraform-based Infrastructure as Code
- custom AWS VPC architecture
- multi-AZ EKS deployment
- private worker nodes with no public IP exposure
- Bastion Host access model
- IAM design based on Principle of Least Privilege
- AWS EBS CSI integration for persistent storage
- Argo CD-based GitOps workflow
- Horizontal Pod Autoscaler
- Cluster Autoscaler
- Canary deployment strategy
- secure and production-oriented Kubernetes platform design

## What I Learned from This Project

This project helped me move beyond basic Kubernetes deployment and understand how a production-style cloud platform is designed.

Through this project, I learned:

- how to build AWS infrastructure using Terraform,
- how to design secure networking for EKS,
- how to isolate worker nodes in private subnets,
- how to configure persistent storage for stateful workloads,
- how GitOps improves deployment consistency,
- how pod and node autoscaling work together,
- and how canary deployments reduce risk during application releases.

This project gave me a much stronger understanding of real-world DevOps practices involving infrastructure, Kubernetes, security, scaling, and controlled deployments.
