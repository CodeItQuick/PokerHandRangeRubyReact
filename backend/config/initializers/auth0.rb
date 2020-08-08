# def redirect_handler()
#     def callback
#         @user = User.find_or_create_from_auth_hash(params[:Authentication])
        
#         # session = request.env['omniauth.auth']
#         render json: {Message: 'Authenticated', Session: session, User: @user}
#     end

#     def failure
#         render json: {Message: 'Authentication Failure'}
#     end
# end

# Rails.application.config.middleware.use OmniAuth::Builder do
#     provider(
#       :auth0,
#       'NTS7ZtvzLweGZjLhYDlhj9PsN44FDFel',
#       'zBOS1TXSSbMVA-SsKgAfs4_VzbSPu5gMoPD8015xDpBGh-AP7dFUDbAxKTPKYF8X',
#       'dev-824eb3ar.us.auth0.com',
#     #   callback_path: redirect_handler,
#     #   authorize_params: {
#     #     auth_token
#     #   }
#     )
#   end