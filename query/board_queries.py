import data_manager


def get_boards():
    """
    Gather all boards
    :return:
    """
    # remove this code once you implement the database
    # return [{"title": "board1", "id": 1}, {"title": "board2", "id": 2}]

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """)


def save_new_board_data(userid, board_name, col1, col2, col3, col4, type=True):
    return data_manager.execute_insert(
        """
        WITH ins1 AS (
        INSERT INTO boards (title, type, user_id)
        VALUES (%(board_name)s, %(type)s, %(userid)s)
        RETURNING id)
        INSERT INTO columns (title, board_id)
        VALUES (%(col1)s, (SELECT id FROM ins1)), 
        (%(col2)s, (SELECT id FROM ins1)),
        (%(col3)s, (SELECT id FROM ins1)),
        (%(col4)s, (SELECT id FROM ins1));
        SELECT id, type 
        FROM boards
        GROUP BY id
        HAVING id = max(id);
        """, {'board_name': board_name, 'userid': userid, 'col1': col1, 'col2': col2, 'col3': col3, 'col4': col4,
              'type': type})
