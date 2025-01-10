import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

interface CreateDogProps {
  isLoading: boolean;
  fetchAndSetAllDogs: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface State {
  name: string;
  description: string;
  picture: string;
}

export class ClassCreateDogForm extends Component<CreateDogProps, State> {
  state: State = {
    name: "",
    description: "",
    picture: Object.values(dogPictures)[0],
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.setIsLoading(true);
    const newDog = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.picture,
      isFavorite: false,
    };
    Requests.postDog(newDog)
      .then(() => {
        this.props.fetchAndSetAllDogs();
        this.setState({
          name: "",
          description: "",
          picture: Object.values(dogPictures)[0],
        });
      })
      .then(() => toast.success(`✅ ${this.state.name} has been added! 🐾`))
      .finally(() => this.props.setIsLoading(false));
  };

  render() {
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={this.handleSubmit}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => this.setState({ name: e.target.value })}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => this.setState({ description: e.target.value })}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => this.setState({ picture: e.target.value })}
          disabled={false}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option
                value={pictureValue}
                key={pictureValue}
              >
                {label}
              </option>
            );
          })}
        </select>
        <input
          type="submit"
          value="submit"
          disabled={false}
        />
      </form>
    );
  }
}
