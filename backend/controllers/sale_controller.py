from models.database import db, Sale, SaleItem, Product

def get_all_sales():
    sales = Sale.query.order_by(Sale.id.desc()).all()
    return [s.to_dict() for s in sales]

def create_sale(data):
    try:
        items_data = data.get('items', [])
        if not items_data:
            raise ValueError("Sale must contain items")
            
        subtotal = sum(item['price'] * item['quantity'] for item in items_data)
        tax = subtotal * 0.05
        total_amount = subtotal + tax
        
        new_sale = Sale(total_amount=total_amount)
        db.session.add(new_sale)
        db.session.flush() # Get the ID for the new sale
        
        for item_data in items_data:
            # Verify product exists
            product = Product.query.get(item_data['product_id'])
            if not product:
                raise ValueError(f"Product ID {item_data['product_id']} not found")
                
            sale_item = SaleItem(
                sale_id=new_sale.id,
                product_id=product.id,
                product_name=product.name,
                quantity=item_data['quantity'],
                price=item_data['price'] # Lock in the price at time of sale
            )
            db.session.add(sale_item)
            
        db.session.commit()
        return new_sale.to_dict()
        
    except Exception as e:
        db.session.rollback()
        raise e
