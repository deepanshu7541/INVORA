# **SCIMS (Surgical Center Inventory Management System)**

---

## **1. Introduction**
SCIMS is a **healthcare inventory management system** tailored specifically for **Operating Room (OR) Nurses** to assist them in efficiently locating, tracking, and managing medical supplies and equipment. The primary user base will be OR nurses accessing the system through **mobile devices**, so the design will focus on **mobile-friendly features** and **usability**.

---

## **2. Functional Requirement Analysis**

### **Search Bar for Supplies**
- A **search bar** allows OR nurses to search for medical supplies by **name** or **category**.
- Nurses can search for items by typing **keywords**.
- The search bar will be available on **every page** for easy access.

#### **Two Main Actions from Search Results:**
1. **Click to View Information**  
   - Clicking an item shows **detailed information** about the supply (e.g., description, specifications).

2. **Add to Cart ("+")**  
   - Clicking the **"+" symbol** adds the item to the cart.

---

### **Multi-Name Search Option**
- The system should allow **multiple names** (aliases or part names) to be entered to search for the same item.
- Nurses should be able to input **different variations** of an item’s name (e.g., "scalpel," "surgical blade") to find the correct item.

---

### **Cart Management**
- A **cart system** to track items that nurses have selected.
- The cart should display the **location** of each item (rooms, racks, bins).
- Each item in the cart should have a **checkbox** for tracking whether it has been retrieved.
- A **"Clear Cart" button** will remove all items from the cart.
- After clearing the cart, a **confirmation screen** will be displayed with the option to **undo the action**.

---

### **Browse Through Racks/Bins**
- Nurses should be able to **browse racks and bins** to see what supplies are available in each location.
- Clicking on a **rack/bin** will display the items stored there, with the option to add any supply to the cart.

---

### **User Access Control**
- Differentiation between **admin** and **non-admin users**.
  - **Admin Accounts**  
    - Can **edit, add, remove, and manage** all system data, including supplies and user permissions.
  - **Non-Admin Accounts**  
    - Can only **read the data** (view supplies, racks, and other information), with no permission to make edits.

---

## **3. Non-Functional Requirements**

### **1. Performance**
- The system should be **fast and responsive**, with minimal load times.
- Must support up to **100 concurrent users** without significant performance degradation.

---

### **2. Scalability**
- The system should be **scalable** to accommodate additional racks, bins, or supply items as the hospital or surgical center grows.

---

### **3. Security**
- **User Authentication**  
  - Ensure secure user login for both admin and non-admin accounts.
- **Data Protection**  
  - All sensitive medical and user data must be **encrypted**, both in transit and at rest.
- **Role-Based Access Control**  
  - Admins have **full access** to all data, while non-admins have **read-only access**.

---

### **4. Usability**
- The system must be **easy to use** with minimal training required, specifically designed for the **fast-paced OR environment**.
- There should be **clear instructions** or **tooltips** available to guide new users.

---

### **5. Availability**
- The system should be **available 99% of the time**, ensuring it is operational during surgery shifts.

---

### **6. Backup and Recovery**
- Regular **data backups** should be made to ensure that any loss of data can be quickly recovered.

---

## **4. Setup and Installation**

### **Backend Setup**
1. Create a `.env` file in the backend folder and add the following variables:
   ```
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret_key
   ```

2. Install dependencies:
   ```
   cd backend
   npm install
   ```

3. Start the backend server:
   ```
   npm start
   ```

---

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm run dev
   ```

---

## **5. Contributors**
- **Deepanshu Chand** - Full-stack Developer
- **Harsh Vardhan** - Database Developer
- **Rajvi Barot** - Frontend Developer


---

### **7. Contact**
For any questions or contributions, feel free to reach out at **deepanshu7541@gmail.com**.

---