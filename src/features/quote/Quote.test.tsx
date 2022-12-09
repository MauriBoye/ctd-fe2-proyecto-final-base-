import { render } from "../../test-utils";
import Quote from "./Quote";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("QuoteComponent", () => {
  it("should render default quote", () => {
    render(<Quote />);
    expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
  });

  it("should render loading when click the random button", async () => {
    render(<Quote />);
    await waitFor(() => {
      userEvent.click(screen.getByText("Obtener cita aleatoria"));
    });
    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument();
  });

  it("should render loading when click the character button", async () => {
    render(<Quote />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    userEvent.type(input, "Milhouse");
    await waitFor(() => {
      userEvent.click(screen.getByText("Obtener Cita"));
    });
    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument();
  });

  it("should render character quote when click button with a valid input value", async () => {
    render(<Quote />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    userEvent.type(input, "Milhouse");
    await waitFor(() => {
      userEvent.click(screen.getByText("Obtener Cita"));
    });
    expect(
      await screen.findByText("But my mom says I'm cool.")
    ).toBeInTheDocument();
  });

  it("should render error when invalid input", async () => {
    render(<Quote />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    userEvent.type(input, "1");
    await waitFor(() => {
      userEvent.click(screen.getByText("Obtener Cita"));
    });
    expect(
      await screen.findByText("Por favor ingrese un nombre válido")
    ).toBeInTheDocument();
  });
});
