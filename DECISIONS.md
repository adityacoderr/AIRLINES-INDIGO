# DECISIONS.md

# Architectural Decisions

## Why Socket.IO?

Chosen to satisfy the real-time update requirement and provide immediate dashboard synchronization and notifications.

## Why MongoDB?

Flexible schema design and rapid development.

## Why Separate Admin Dashboard?

The assignment required a POST API to trigger flight events. Instead of using Postman, an Admin UI was created to demonstrate the functionality in a realistic way.

## Why Docker?

Provides reproducible environments across different machines.

## Why Responsive Components?

Separate mobile and desktop experiences improve usability while maintaining feature parity.

## Trade-offs

* Dummy authentication using a static user ID for demonstration simplicity.
* MongoDB backup included instead of automated seeding.
* Docker restore performed manually to preserve realistic demo data.

```
```
