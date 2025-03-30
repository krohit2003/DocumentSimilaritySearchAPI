# Document Similarity Search API

##  Brief Explanation of My Approach

This project is a **document similarity search API** that allows users to **upload PDF documents** and perform **semantic searches** to find the most relevant text chunks.  

###  How It Works:

1️ **Extract Text from PDFs**   
   - The user uploads a **PDF document** through the frontend.  
   - I use **`pdfplumber`** to **extract text** from the PDF file.  

2 **Chunking and Vectorization** 
   - The extracted text is **split into smaller chunks** for better search accuracy.  
   - Each chunk is **converted into numerical vectors** using **Hugging Face Sentence Transformers (`Hugging Face Sentence Transformer model == all-MiniLM-L6-v2`)**.  

3️ **FAISS for Fast Search** 
   - These vector embeddings are stored in **FAISS**, a **high-performance similarity search library**.  
   - When a user enters a **search query**  it is also converted into an embedding, and **FAISS retrieves the top K most similar chunks** based on similarity scores.  

4️ **FastAPI for API Interaction** 
   - The backend is built using **FastAPI** to provide API endpoints for:
     - Uploading PDFs  
     - Searching for relevant content  
   - The API runs on **Uvicorn**  allowing fast asynchronous request handling.  

---

## Successfully Completed Bonus Task
### Additional Features Implemented

 Implemented **Cosine Similarity**, **Dot Product Similarity**, and **Euclidean Distance** for more accurate search results.  
The code allows users to choose the similarity metric dynamically.  

**Implemented real-time indexing:**  
Each time a new document is uploaded, it is indexed in real time, ensuring the latest documents are always searchable.  



## **How to Run the Project Locally**  

### **for backend**  

### **1. Clone the Repository**  
```sh
git clone https://github.com/krohit2003/DocumentSimilaritySearchAPI.git
cd DocumentSimilaritySearchAPI

```

### **2. Set Up a Virtual Environment**
```sh
python -m venv venv
venv\Scripts\activate      # For Windows
```

### **3. Install Dependencies**  
```sh
cd backend
pip install -r requirements.txt
```

### **4. Run the FastAPI Server**  
```sh
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The API will now be accessible at **http://127.0.0.1:8000**  


### **For frontend**  

```sh
cd frontend
npm install
```

### **4.Run the frontend**  
```sh
npm run dev
```

The API will now be accessible at **http://localhost:5173/**  


## **API Endpoints & Examples**  

### **1. Upload PDF File**
#### **Endpoint:**  
```http
POST /api/upload_pdf
```
#### **Request Example (Form-Data)**
```sh
curl -X POST "http://127.0.0.1:8000/api/upload_pdf" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@budget_speech.pdf"
```

#### **Response Example**
```json
{
  "message": "PDF uploaded and indexed successfully.",
  "num_chunks": 150
}
```

---

### **2. Search for Similar Content**
#### **Endpoint:**  
```http
GET /api/search?query="budget deficit" &top_k=5
```
#### **Response Example**
```json
{
  "query": "budget deficit",
  "results": [
    {
      "chunk": "The government plans to reduce the budget deficit through increased taxation...",
      "score": 0.85
    },
    {
      "chunk": "A significant reduction in fiscal deficit is projected over the next 5 years...",
      "score": 0.78
    }
  ]
}
```

---

##  Tech Stack
### Backend
- **FastAPI** - High-performance Python web framework for building APIs  
- **FAISS** - Efficient similarity search library for fast document retrieval  
- **Hugging Face Transformers** - Used `all-MiniLM-L6-v2` for text embeddings  
- **pdfplumber** - Extract text from PDFs  
- **FAISS (Facebook AI Similarity Search)** - Stores and retrieves document embeddings efficiently  
- **Uvicorn** - ASGI server for serving the FastAPI application  

### Frontend
- **React.js** - Frontend framework for building the user interface  
- **Vite** - Lightweight development server for React  
- **Tailwind CSS** - Utility-first CSS framework for styling  
- **Axios** - Handles API requests between frontend and backend  

---


