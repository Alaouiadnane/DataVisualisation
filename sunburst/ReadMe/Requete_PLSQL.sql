SET serveroutput on;
      
 -----------------      
DECLARE
v_counter NUMBER(15); --declaration of counter variable
CURSOR C_EMP IS
       select DISTINCT MARQUE, NOM, OCCASION, PUISSANCE FROM EXPORT ORDER BY MARQUE, NOM, PUISSANCE;
BEGIN
  v_counter := 0; --Compteur d'occurence
    FOR Co IN C_EMP LOOP
     select count(*) into v_counter 
     from export e where e.Marque = Co.Marque and e.Nom=Co.Nom and e.PUISSANCE= Co.PUISSANCE and e.OCCASION= Co.Occasion;
    dbms_output.put_line('"'||+Co.Marque||'-'|| +Co.Nom||'-'||+Co.Occasion||'-'||+Co.Puissance||'"'||','|| v_counter); --show current iteration number in dbms script output 
  END LOOP; --Fin de declaration
END;



