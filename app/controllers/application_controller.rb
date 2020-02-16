class ApplicationController < ActionController::API
    def create
        # Set your secret key: remember to switch to your live secret key in production
        # See your keys here: https://dashboard.stripe.com/account/apikeys
        Stripe.api_key = ENV['STRIPE_API_KEY']
        
        charge = Stripe::Charge.create(
            :amount => params[:amount],       # <== Currency in 'cents'
            :currency => "usd",
            :source => params[:tok],  # <== from previous section
            :description => "Fuzzy eyeglasses"
          )
       render json: charge

    end
end
