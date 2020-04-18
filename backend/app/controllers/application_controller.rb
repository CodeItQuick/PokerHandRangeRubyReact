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

    def session_user
        decoded_hash = decoded_token
        if !decoded_hash.empty?
            user_id = decoded_hash[0]['user_id']
            @user = User.find_by(id: user_id)
        else
            nil
        end
    end

    def auth_header
        request.headers['Authorization']
    end

    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, ENV['AUTH_SECRET'], true, algorithm: 'HS256')
            rescue JWT::DecodeError
                []
            end
        end
    end
end
