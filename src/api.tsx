import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const API_URL = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(`${API_URL}/dogs`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch dogs");
        }
      })
      .catch((error) => {
        console.error("Error fetching dogs", error);
        return [];
      });
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (note: Omit<Dog, "id">) => {
    return fetch(`${API_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to create dog");
        }
      })
      .catch((error) => {
        console.error("Error creating dog", error);
        return null;
      });
  },

  // should delete a dog from the database
  deleteDog: (id: number): Promise<void> => {
    return fetch(`${API_URL}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete dog");
        }
      })
      .catch((error) => {
        console.error("Error deleting dog", error);
      });
  },

  updateDog: (id: number, updatedDog: Partial<Dog>): Promise<Dog> => {
    return fetch(`${API_URL}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to update dog");
        }
      })
      .catch((error) => {
        console.error("Error updating dog", error);
        return null;
      });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
