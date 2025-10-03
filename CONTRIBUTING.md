# Contributing to ChezFlora 🌸

We welcome contributions to ChezFlora! This document outlines the guidelines for contributing to the project.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone the forked repository** to your local machine.

    ```bash
    git clone https://github.com/YOUR_USERNAME/ChezFlora.git
    cd ChezFlora
    ```

## Development Setup

### Quick Setup (Recommended)
```bash
./setup.sh
```

### Manual Setup
1.  **Install dependencies:**
    ```bash
    # Install Yarn globally if not present
    npm install -g yarn

    # Server dependencies
    cd Server
    yarn install

    # Client dependencies
    cd ../client
    npm install

    # Root dependencies (for convenience scripts)
    cd ..
    npm install
    ```

2.  **Configure environment variables:**
    ```bash
    # Copy environment templates
    cp Server/.env.example Server/.env
    cp client/.env.example client/.env
    ```
    Edit the `.env` files with your specific configuration values.

3.  **Start the development servers:**
    
    **Option 1: Both servers simultaneously**
    ```bash
    npm run dev
    ```
    
    **Option 2: Separate terminals**
    ```bash
    # Terminal 1 - Server
    npm run dev:server
    
    # Terminal 2 - Client  
    npm run dev:client
    ```

## Contributing Guidelines

1.  **Create a new branch** for your feature or bug fix.

    ```bash
    git checkout -b feature/<your_feature_name>
    ```

2.  **Follow the coding standards:**

    *   Use consistent code formatting (Prettier is recommended).
    *   Write clear and concise code with meaningful comments.
    *   Follow the existing project structure and naming conventions.

3.  **Test your changes:**

    *   Ensure that your changes don't break existing functionality.
    *   Write unit tests for new features or bug fixes.

4.  **Commit your changes:**

    *   Write a clear and descriptive commit message.
    *   Follow the conventional commits specification (e.g., `feat: Add new feature`, `fix: Fix bug`).

5.  **Push your changes** to your forked repository.

    ```bash
    git push origin feature/<your_feature_name>
    ```

6.  **Submit a pull request:**

    *   Create a pull request from your branch to the `main` branch of the original repository.
    *   Provide a clear and detailed description of your changes in the pull request.
    *   Reference any related issues in the pull request description.

## Pull Request Review Process

1.  Your pull request will be reviewed by one or more maintainers.
2.  You may be asked to make changes based on the review feedback.
3.  Once your pull request is approved, it will be merged into the `main` branch.

## Reporting Issues

If you find a bug or have a feature request, please submit an issue on GitHub.

## License

By contributing to ChezFlora, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Acknowledgments

Thank you for contributing to ChezFlora!
