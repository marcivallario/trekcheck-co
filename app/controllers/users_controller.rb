class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
    def show
        current_user = auth
        if current_user
            render json: current_user, status: :ok
        else 
            render json: {error: "User not authorized: please sign in."}, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def user_params
        params.permit(:first_name, :last_name, :email, :password)
    end
end
