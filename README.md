# 🌾 FarmStock

FarmStock is a web-based **Farm Inventory Management System** developed using **Spring Boot, MySQL, HTML, CSS, and JavaScript**.

The system helps farmers or farm managers manage crop records, track harvest quantities, record sales, monitor available stock, calculate revenue, and view crop-wise transaction history through a simple web dashboard.

---

## 🚀 Features

- 🌱 Add and manage crop details
- 🌾 Record harvest quantities
- 🛒 Record crop sales
- 📦 Automatically calculate available stock
- 💰 Calculate total revenue from sales
- 📊 View crop-wise inventory information
- 📅 View harvest and sales history
- 🔍 Search and view individual crop transaction history
- ⚠️ Prevent sales when available stock is insufficient
- 🌐 Web-based dashboard
- 🗄️ MySQL database for persistent data storage

---

## 🛠️ Technologies Used

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- REST API
- Maven

### Frontend
- HTML
- CSS
- JavaScript

### Database
- MySQL

### Development Tool
- IntelliJ IDEA

---

## 🏗️ System Architecture

```text
                    USER
                      ↓
                 WEB DASHBOARD
                      ↓
                REST CONTROLLER
                      ↓
                   SERVICE
                      ↓
                 REPOSITORY
                      ↓
                    MYSQL
