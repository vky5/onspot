import axios from "axios";

const respones = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/posts', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTBkNTZjNjM0NDc1NzI1YzQ2ZDIxMyIsImlhdCI6MTcyMDc2Nzg1MiwiZXhwIjoxNzI4NTQzODUyfQ.Ut_v0wLkkl4VlAVm2b9URDETqMOrvBD1jVYC8ZBA2bA'
        }
        });
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Handle error as needed
    }
};

// Call the async function and log the response (since it returns a Prom


respones().then(data => console.log(data)).catch(error => console.error(error));