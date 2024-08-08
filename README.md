# HTTP Flood Simulation with IP Spoofing(DDOS stimulation)

## Project Overview

This project simulates a Distributed Denial-of-Service (DDoS) attack using HTTP flood techniques. It is designed as an educational tool to demonstrate how HTTP floods can overwhelm a server's resources, potentially leading to temporary unavailability. The project includes a client, a proxy server, and a target server. The client sends a large volume of HTTP requests to the target server, either directly or through the proxy server. The proxy server supports an IP spoofing mode to demonstrate how an attacker might attempt to bypass rate limiting or evade detection.

**Important Note:** This project is for educational and testing purposes only. Unauthorized use of this tool against any server without permission is illegal and unethical.

## Features

- **HTTP Flooding:**
  - The client can send a high volume of HTTP requests (up to 10,000 or more) to the target server to simulate a DDoS attack.
  - The target server can operate in two modes: Normal mode and Rate Limiting mode.
  
- **Proxy Server:**
  - Supports two modes: Normal mode and IP Spoofing mode.
  - In IP Spoofing mode, the proxy server alters the `X-Forwarded-For` header in the HTTP request to simulate requests coming from different IP addresses.

- **Rate Limiting:**
  - The target server can be configured to apply rate limiting to incoming requests, helping to protect against basic HTTP flood attacks.

## Drawbacks & Limitations

- **IP Spoofing Limitations:**
  - The IP spoofing feature in this project only modifies the `X-Forwarded-For` header in the application layer. This does not actually change the source IP address in the network layer of the TCP/IP stack.
  - Because the IP address is only spoofed at the application layer, it may not be effective against more advanced rate-limiting mechanisms or network-layer defenses.

- **Simulation Only:**
  - This project is a simulation of a DDoS attack using HTTP flooding. There are many types of DDoS attacks, including SYN floods, UDP floods, and others. This project specifically focuses on HTTP flood attacks and does not cover other types of DDoS techniques.

- **Not Suitable for Real-World Attacks:**
  - This project is not intended to be used for real-world attacks and lacks the sophistication and stealth techniques that might be employed in a real DDoS scenario.

## How It Works

1. **Client:**
   - The client sends a specified number of HTTP requests to the target server. These requests can be sent directly or routed through the proxy server.

2. **Proxy Server:**
   - The proxy server forwards requests from the client to the target server. In IP Spoofing mode, the proxy server modifies the `X-Forwarded-For` header to simulate different source IP addresses.

3. **Target Server:**
   - The target server processes incoming requests and logs the results. In Rate Limiting mode, the server limits the number of requests it processes from each IP address.

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/amul69906995/ddos-stimulation
   cd ddos stimulation
   ```
