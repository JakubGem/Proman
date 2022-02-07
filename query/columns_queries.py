import data_manager


def get_column_new_for_board(board_id, name):
    return data_manager.execute_select(
        """
        SELECT id FROM columns
        WHERE columns.board_id = %(board_id)s
        AND columns.title = %(name)s
        ;
        """
        , {"board_id": board_id, "name": name}, fetchall=False)


def get_columns(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM columns
        WHERE columns.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})
