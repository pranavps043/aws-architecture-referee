export interface ServiceAttributes {
  traffic: ("Low" | "Spiky" | "Consistent" | "High")[];
  budget: ("Low" | "Medium" | "High")[];
  ops: ("Low" | "Medium" | "High")[];
  workload: ("Short" | "Long" | "Always On")[];
}

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  attributes: ServiceAttributes;
}

export interface ComparisonPoint {
  dimension: string;
  serviceAValue: string;
  serviceBValue: string;
  winner?: "A" | "B" | "Tie"; // Optional winner for this specific dimension
}

export interface Comparison {
  id: string;
  title: string;
  category: "Compute" | "Database" | "Messaging" | "Storage" | "Network";
  serviceA: ServiceData;
  serviceB: ServiceData;
  comparisonPoints: ComparisonPoint[];
  verdict: string; // The "Referee's" final call
  summary: string;
}

export const comparisons: Comparison[] = [
  {
    id: "lambda-vs-ec2",
    title: "AWS Lambda vs. Amazon EC2",
    category: "Compute",
    summary: "The classic Serverless vs. Server comparison. Choose Lambda for event-driven, variable workloads. Choose EC2 for long-running, consistent compute needs.",
    verdict: "Use Lambda for new, event-driven applications or variable traffic. Stick to EC2 if you need full OS control, long-running processes, or specific kernels.",
    serviceA: {
      id: "lambda",
      name: "AWS Lambda",
      description: "Event-driven, serverless compute service that runs code in response to events.",
      pros: [
        "No server management (zero maintenance)",
        "Pay only for compute time (ms granularity)",
        "Automatic scaling from 0 to thousands",
      ],
      cons: [
        "Cold starts can introduce latency",
        "Execution time limit (15 mins)",
        "Limited control over environment",
      ],
      bestFor: ["APIs (REST/GraphQL)", "Data processing triggers", "Scheduled tasks (Cron)"],
      attributes: {
        traffic: ["Low", "Spiky"],
        budget: ["Low", "Medium"],
        ops: ["Low"],
        workload: ["Short"]
      }
    },
    serviceB: {
      id: "ec2",
      name: "Amazon EC2",
      description: "Secure, resizable compute capacity in the cloud (Virtual Machines).",
      pros: [
        "Full control over OS and environment",
        "No execution time limits",
        "Cost-effective for steady-state workloads (Reserved Instances)",
      ],
      cons: [
        "You manage updates, patches, and security",
        "You pay for idle time if not auto-scaled perfectly",
        "Slower to scale up compared to Lambda",
      ],
      bestFor: ["Long-running web servers", "Legacy applications", "High-performance computing (HPC)"],
      attributes: {
        traffic: ["Consistent", "High"],
        budget: ["Medium", "High"],
        ops: ["High"],
        workload: ["Long", "Always On"]
      }
    },
    comparisonPoints: [
      {
        dimension: "Cost Model",
        serviceAValue: "Pay-per-request & duration (GB-seconds). Free tier generous.",
        serviceBValue: "Pay-per-hour/second of uptime. Savings Plans available.",
      },
      {
        dimension: "Scalability",
        serviceAValue: "Instant, automatic horizontal scaling.",
        serviceBValue: "Auto-scaling groups required; slower spin-up time.",
        winner: "A"
      },
      {
        dimension: "Maintenance",
        serviceAValue: "Zero maintenance (AWS handles OS patching).",
        serviceBValue: "High maintenance (User handles OS patching, updates).",
        winner: "A"
      },
      {
        dimension: "Performance",
        serviceAValue: "Good, but cold starts can impact p99 latency.",
        serviceBValue: "Consistent, predictable performance once running.",
        winner: "B"
      }
    ]
  },
  {
    id: "dynamodb-vs-rds",
    title: "DynamoDB vs. Amazon RDS",
    category: "Database",
    summary: "NoSQL key-value store vs. Traditional Relational Database.",
    verdict: "Go with DynamoDB for massive scale and simple query patterns. Choose RDS for complex relationships, ACID transactions across multiple tables, and legacy compatibility.",
    serviceA: {
      id: "dynamodb",
      name: "Amazon DynamoDB",
      description: "Fast, flexible NoSQL database service for single-digit millisecond performance at any scale.",
      pros: [
        "Serverless & auto-scaling",
        "Single-digit millisecond latency",
        "Seamless multi-region replication (Global Tables)",
      ],
      cons: [
        "Complex query patterns/joins are difficult",
        "Capacity planning can be tricky (if not On-Demand)",
        "Item size limits (400KB)",
      ],
      bestFor: ["High-traffic web apps", "Gaming leaderboards", "Shopping carts"],
      attributes: {
        traffic: ["Spiky", "High"],
        budget: ["Low", "Medium"], // Pay per request
        ops: ["Low"],
        workload: ["Short", "Always On"] // Fits many
      }
    },
    serviceB: {
      id: "rds",
      name: "Amazon RDS",
      description: "Managed relational database service (MySQL, PostgreSQL, etc.).",
      pros: [
        "Supports complex SQL queries & joins",
        "Standard relation model (ACID)",
        "Familiar engines (PostgreSQL, MySQL)",
      ],
      cons: [
        "Vertical scaling constraints",
        "Connection limits (needs Proxy)",
        "Maintenance windows for patching",
      ],
      bestFor: ["Enterprise ERP/CRM", "Applications with complex data relationships", "Lift-and-shift apps"],
      attributes: {
        traffic: ["Consistent"],
        budget: ["Medium", "High"],
        ops: ["Medium"],
        workload: ["Always On"]
      }
    },
    comparisonPoints: [
      {
        dimension: "Data Model",
        serviceAValue: "NoSQL (Key-Value/Document). Flexible schema.",
        serviceBValue: "Relational (Tables, Rows, Columns). Rigid schema.",
      },
      {
        dimension: "Scalability",
        serviceAValue: "Virtually unlimited horizontal scaling.",
        serviceBValue: "Vertical scaling (bigger instance) or Read Replicas.",
        winner: "A"
      },
      {
        dimension: "Query Flexibility",
        serviceAValue: "Limited. Optimised for specific access patterns.",
        serviceBValue: "High. SQL allows complex ad-hoc queries and joins.",
        winner: "B"
      }
    ]
  }
];
