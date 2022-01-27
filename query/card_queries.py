import data_manager


def create_new_card(card_data):
    return data_manager.execute_insert("""
        INSERT INTO cards(board_id, columns_id, title, card_order, user_id, active) 
        VALUES (%(board_id)s, %(columns_id)s, %(title)s, %(card_order)s, %(user_id)s, %(active)s)
        RETURNING id;""", {'board_id': card_data['board_id'], 'columns_id': card_data['columns_id'],
                           'title': card_data['title'], 'card_order': card_data['card_order'],
                           'user_id': card_data['user_id'], 'active': card_data['active']})


def delete_card(card_id):
    return data_manager.execute_delete("""DELETE FROM proman.public.cards
    WHERE cards.id = %(card_id)s;""", {'card_id': card_id})


def edit_card(card_id, title):
    return data_manager.execute_edit("""UPDATE cards 
    SET title = %(title)s
    WHERE cards.id = %(card_id)s
    RETURNING *;""", {'card_id': card_id, 'title': title})


def get_cards_for_board(board_id):
    # remove this code once you implement the database
    # return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def change_column(card_id, column_id):
    return data_manager.execute_edit("""UPDATE cards 
    SET columns_id = %(column_id)s
    WHERE cards.id = %(card_id)s
    RETURNING *;""", {'card_id': card_id, 'column_id': column_id})