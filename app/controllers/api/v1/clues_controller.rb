class Api::V1::CluesController < ApplicationController
  def index

    def get_clues(value, number_of_times)
      questions = {
        cat_1_array: [],
        cat_2_array: []
      }
      # offset should be random based on number of clues
      offset = nil
      if value == 200
        offset = 0
      elsif value == 400
        offset = 0
      elsif value == 600
        offset = 0
      elsif value == 800
        offset = 0
      elsif value == 1000
        offset = 0
      end

      response = HTTParty.get("http://jservice.io/api/clues?value=#{value}&max_date=2014-09-18&offset=#{offset}")
      parsed_response = JSON.parse(response.body)

      number_of_times.times do
        cat_1_clue = parsed_response.sample

        # add more filters here to clues
        while questions[:cat_1_array].include?(cat_1_clue) || questions[:cat_2_array].include?(cat_1_clue)
          cat_1_clue = parsed_response.sample
        end

        questions[:cat_1_array] << cat_1_clue

        cat_2_clue = parsed_response.sample

        while questions[:cat_1_array].include?(cat_2_clue) || questions[:cat_2_array].include?(cat_2_clue)
          cat_2_clue = parsed_response.sample
        end

        questions[:cat_2_array] << cat_2_clue
      end

      return questions
    end

    two_hund_questions = get_clues(200, 2)
    four_hund_questions = get_clues(400, 2)
    six_hund_questions = get_clues(600, 0)
    eight_hund_questions = get_clues(800, 0)
    one_thou_questions = get_clues(1000, 0)

    cat_1_all = [
      two_hund_questions[:cat_1_array],
      four_hund_questions[:cat_1_array],
      six_hund_questions[:cat_1_array],
      eight_hund_questions[:cat_1_array],
      one_thou_questions[:cat_1_array]
    ]

    cat_2_all = [
      two_hund_questions[:cat_2_array],
      four_hund_questions[:cat_2_array],
      six_hund_questions[:cat_2_array],
      eight_hund_questions[:cat_2_array],
      one_thou_questions[:cat_2_array]
    ]

    clue_array = [cat_1_all.flatten, cat_2_all.flatten]
    render json: clue_array
  end
end
