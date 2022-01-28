import data_manager


def get_column_new_for_board(board_id):
    return data_manager.execute_select(
        """
        SELECT id FROM columns
        WHERE columns.board_id = %(board_id)s
        AND columns.title = 'new'
        ;
        """
        , {"board_id": board_id}, fetchall=False)


def get_columns(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE columns.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})
