package routes

import (
	"ta_14-backend-notification/controllers"

	"github.com/gofiber/fiber/v2"
)

func OrderRoutes(app *fiber.App) {
	app.Post("/payment", controllers.PostPayment)
	app.Post("/order", controllers.PostOrder)
	app.Post("/cancel", controllers.PostCancelOrder)
	app.Post("/accept", controllers.PostAcceptOrder)
	app.Post("/reject", controllers.PostRejectOrder)
}
