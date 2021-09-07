package main

import (
	"os"
	"ta_14-backend-notification/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")
	port := os.Getenv("PORT")

	app := fiber.New()

	routes.AuthRoutes(app)
	routes.OrderRoutes(app)

	app.Listen(":" + port)
}
