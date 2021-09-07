package routes

import (
	"ta_14-backend-notification/controllers"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	app.Post("/register", controllers.PostRegister)
}
