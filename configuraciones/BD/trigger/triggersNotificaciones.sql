/* ejemplo*/
DELIMITER //

CREATE TRIGGER TR_NOMODIF_FECHAALTA  BEFORE UPDATE ON notificaciones
FOR EACH ROW
BEGIN
/*
	DESCRIPCION: al actualizar el visto o el estado de la notificacion
	con este trigger no afecta el timestamp
 */
 UPDATE notificaciones SET visto = NEW.visto WHERE id = NEW.id;
 UPDATE notificaciones SET fecha = OLD.fecha WHERE id = NEW.id;

END;//

DELIMITER ;