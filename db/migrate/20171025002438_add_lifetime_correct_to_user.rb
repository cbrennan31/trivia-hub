class AddLifetimeCorrectToUser < ActiveRecord::Migration
  def change
    add_column :users, :lifetime_correct, :integer, default: 0
  end
end
