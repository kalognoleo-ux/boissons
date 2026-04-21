/**
 * Migration de données: localStorage → Firestore
 * 
 * Ce script copie vos données existantes vers Firestore
 * À exécuter UNE FOIS après la configuration Firestore
 */

import { db } from '../firebase-config.js';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  Timestamp,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ===== CONFIGURATION =====
const DEPOT_ID = 'depot-la-trousse';  // À remplacer par votre ID Firestore
const OWNER_UID = 'joel-uid-firebase'; // À remplacer par le UID du propriétaire

// ===== 1. MIGRER LES PRODUITS =====
/**
 * Convertit DATA_PRODUITS en collection Firestore
 */
export async function migrateProducts(DATA_PRODUITS) {
  console.log('📦 Migration produits...');
  
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    for (const product of DATA_PRODUITS) {
      const productId = product.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      batch.set(doc(collection(db, 'products'), productId), {
        name: product.name,
        category: product.category,
        brand: product.brand,
        basePrice: parseInt(product.price.replace(/\D/g, '')),
        packSize: product.brand.split('·')[1]?.trim() || '',
        description: '',
        archived: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      count++;
    }
    
    await batch.commit();
    console.log(`✅ ${count} produits migrés vers Firestore`);
    return count;
    
  } catch (err) {
    console.error("❌ Erreur migration produits :", err);
    throw err;
  }
}

// ===== 2. MIGRER LE STOCK (INVENTORY) =====
/**
 * Crée la collection inventory avec les stocks actuels
 */
export async function migrateInventory(DATA_PRODUITS, DEPOT_ID) {
  console.log('📊 Migration inventaire...');
  
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    for (const product of DATA_PRODUITS) {
      const productId = product.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      const inventoryId = `${DEPOT_ID}_${productId}`;
      
      batch.set(doc(collection(db, 'inventory'), inventoryId), {
        depotId: DEPOT_ID,
        productId: productId,
        quantity: product.qty,
        lastUpdated: Timestamp.now(),
        lastUpdatedBy: OWNER_UID,
        lowStockThreshold: 12,
        limitedStockThreshold: 25,
        movementHistory: [
          {
            type: 'initial',
            quantity: product.qty,
            reason: 'Migration depuis localStorage',
            timestamp: Timestamp.now()
          }
        ]
      });
      
      count++;
    }
    
    await batch.commit();
    console.log(`✅ ${count} stocks migrés vers Firestore`);
    return count;
    
  } catch (err) {
    console.error("❌ Erreur migration inventaire :", err);
    throw err;
  }
}

// ===== 3. MIGRER LES COMMANDES =====
/**
 * Convertit COMMAND_HISTORY en collection orders
 */
export async function migrateOrders(COMMAND_HISTORY, DEPOT_ID) {
  console.log('🧾 Migration commandes...');
  
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    for (const cmd of COMMAND_HISTORY) {
      // Créer un ID unique pour chaque commande
      const orderId = `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Convertir les lignes de commande
      const lines = (cmd.lines || []).map(line => ({
        productId: line.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
        productName: line.name,
        quantity: line.qty,
        unitPrice: line.price / line.qty,
        totalPrice: line.price
      }));
      
      batch.set(doc(collection(db, 'orders'), orderId), {
        ref: cmd.ref,
        depotId: DEPOT_ID,
        clientId: null,  // À remplir si vous avez l'ID client
        clientName: cmd.client,
        clientPhone: '',  // Si disponible
        
        lines: lines,
        
        orderTotal: cmd.orderTotal || parseInt(cmd.amount.replace(/\D/g, '')),
        amountPaid: cmd.amountPaid || 0,
        amountDue: cmd.amountDue || parseInt(cmd.amount.replace(/\D/g, '')),
        previousBalance: cmd.previousBalance || 0,
        totalDueWithPrevious: cmd.totalDueWithPrevious || parseInt(cmd.amount.replace(/\D/g, '')),
        
        status: cmd.status === 'Payé' ? 'delivered' : 'pending',
        paymentStatus: cmd.status === 'Payé' ? 'paid' : cmd.status === 'Crédit' ? 'credit' : 'unpaid',
        deliveryStatus: cmd.status === 'Payé' ? 'delivered' : 'pending',
        
        createdAt: Timestamp.fromDate(new Date(cmd.createdAt)),
        confirmedAt: null,
        deliveredAt: cmd.status === 'Payé' ? Timestamp.fromDate(new Date()) : null,
        paidAt: cmd.status === 'Payé' ? Timestamp.fromDate(new Date()) : null,
        
        timeline: (cmd.timeline || []).map(event => ({
          event: event.includes('créée') ? 'created' : 
                  event.includes('payée') ? 'paid' :
                  event.includes('livrée') ? 'delivered' : 'update',
          timestamp: Timestamp.fromDate(new Date()),
          by: OWNER_UID
        })),
        
        createdBy: OWNER_UID,
        lastModifiedBy: OWNER_UID,
        updatedAt: Timestamp.now(),
        notes: cmd.notes || ''
      });
      
      count++;
    }
    
    await batch.commit();
    console.log(`✅ ${count} commandes migrées vers Firestore`);
    return count;
    
  } catch (err) {
    console.error("❌ Erreur migration commandes :", err);
    throw err;
  }
}

// ===== 4. MIGRER LES CLIENTS =====
/**
 * Convertit CLIENTS en collection clients
 */
export async function migrateClients(CLIENTS, DEPOT_ID) {
  console.log('👥 Migration clients...');
  
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    for (const client of CLIENTS) {
      batch.set(doc(collection(db, 'clients'), client.id), {
        depotId: DEPOT_ID,
        name: client.name,
        phone: client.phone,
        zone: client.zone,
        type: client.type.toLowerCase().replace(/é/, 'e'),
        
        balanceDue: client.balanceDue || 0,
        creditLimit: null,
        
        status: client.status.toLowerCase(),
        
        contactPerson: '',
        email: '',
        address: '',
        notes: '',
        
        createdAt: Timestamp.now(),
        lastOrderDate: null,
        updatedAt: Timestamp.now()
      });
      
      count++;
    }
    
    await batch.commit();
    console.log(`✅ ${count} clients migrés vers Firestore`);
    return count;
    
  } catch (err) {
    console.error("❌ Erreur migration clients :", err);
    throw err;
  }
}

// ===== 5. MIGRER LES FOURNISSEURS =====
/**
 * Convertit SUPPLIERS en collection suppliers
 */
export async function migrateSuppliers(SUPPLIERS, DEPOT_ID) {
  console.log('🚚 Migration fournisseurs...');
  
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    for (const supplier of SUPPLIERS) {
      batch.set(doc(collection(db, 'suppliers'), supplier.id), {
        depotId: DEPOT_ID,
        name: supplier.name,
        city: supplier.city,
        phone: supplier.phone,
        email: '',
        
        deliveryDelay: supplier.delay,
        minOrderAmount: null,
        
        products: (supplier.products || '').split(',').map(p => ({
          productId: '',  // À remplir
          productName: p.trim()
        })),
        
        status: supplier.status.toLowerCase(),
        createdAt: Timestamp.now()
      });
      
      count++;
    }
    
    await batch.commit();
    console.log(`✅ ${count} fournisseurs migrés vers Firestore`);
    return count;
    
  } catch (err) {
    console.error("❌ Erreur migration fournisseurs :", err);
    throw err;
  }
}

// ===== 6. MIGRER L'ÉQUIPE =====
/**
 * Convertit TEAM_MEMBERS en collection team
 */
export async function migrateTeam(TEAM_MEMBERS, DEPOT_ID) {
  console.log('👤 Migration équipe...');
  
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    for (const member of TEAM_MEMBERS) {
      batch.set(doc(collection(db, 'team'), member.id), {
        depotId: DEPOT_ID,
        userId: null,  // À lier à l'authentification Firebase
        name: member.name,
        phone: member.phone,
        role: member.role.toLowerCase().replace(/\s+/, '_'),
        
        shift: {
          startTime: member.shift.split('-')[0].trim(),
          endTime: member.shift.split('-')[1]?.trim() || '17:00',
          days: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
        },
        
        status: member.status.toLowerCase().replace(/ /g, '_'),
        isActive: true,
        
        createdAt: Timestamp.now(),
        joinedAt: Timestamp.now()
      });
      
      count++;
    }
    
    await batch.commit();
    console.log(`✅ ${count} membres d'équipe migrés vers Firestore`);
    return count;
    
  } catch (err) {
    console.error("❌ Erreur migration équipe :", err);
    throw err;
  }
}

// ===== FONCTION PRINCIPALE DE MIGRATION =====
/**
 * Lance la migration complète
 * À appeler UNE FOIS en console
 */
export async function migrateAllData() {
  console.log('🚀 DÉBUT DE LA MIGRATION');
  console.log('=' .repeat(50));
  
  try {
    // Récupérer les données depuis localStorage
    const DATA_PRODUITS = JSON.parse(localStorage.getItem('productsCatalog') || '[]');
    const COMMAND_HISTORY = JSON.parse(localStorage.getItem('commandHistory') || '[]');
    const CLIENTS = JSON.parse(localStorage.getItem('clientsCatalog') || '[]');
    const SUPPLIERS = JSON.parse(localStorage.getItem('suppliersCatalog') || '[]');
    const TEAM_MEMBERS = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    
    console.log('📋 Données trouvées en localStorage :');
    console.log(`   - Produits: ${DATA_PRODUITS.length}`);
    console.log(`   - Commandes: ${COMMAND_HISTORY.length}`);
    console.log(`   - Clients: ${CLIENTS.length}`);
    console.log(`   - Fournisseurs: ${SUPPLIERS.length}`);
    console.log(`   - Équipe: ${TEAM_MEMBERS.length}`);
    console.log('');
    
    // Lancer les migrations
    const results = {
      products: await migrateProducts(DATA_PRODUITS),
      inventory: await migrateInventory(DATA_PRODUITS, DEPOT_ID),
      orders: await migrateOrders(COMMAND_HISTORY, DEPOT_ID),
      clients: await migrateClients(CLIENTS, DEPOT_ID),
      suppliers: await migrateSuppliers(SUPPLIERS, DEPOT_ID),
      team: await migrateTeam(TEAM_MEMBERS, DEPOT_ID)
    };
    
    console.log('');
    console.log('=' .repeat(50));
    console.log('✅ MIGRATION COMPLÉTÉE');
    console.log('Résumé :');
    console.log(`  ✓ ${results.products} produits`);
    console.log(`  ✓ ${results.inventory} stocks`);
    console.log(`  ✓ ${results.orders} commandes`);
    console.log(`  ✓ ${results.clients} clients`);
    console.log(`  ✓ ${results.suppliers} fournisseurs`);
    console.log(`  ✓ ${results.team} membres`);
    console.log('');
    console.log('🔗 Vérifiez les données dans Firestore Console');
    
    return results;
    
  } catch (err) {
    console.error('❌ ERREUR MIGRATION :', err);
    throw err;
  }
}

// ===== INSTRUCTIONS D'UTILISATION =====
/*
COMMENT UTILISER CE SCRIPT :

1. Ouvrez votre application dans le navigateur
2. Ouvrez la Console DevTools (F12)
3. Collez ce code pour importer le module :

   import { migrateAllData } from './scripts/firebase-migration.js';

4. Lancez la migration :

   await migrateAllData();

5. Observez les logs pour confirmer le succès
6. Allez dans Firestore Console pour vérifier les collections

IMPORTANT :
- Vérifiez bien les données dans Firestore Console après migration
- Certains IDs et références peuvent nécessiter des ajustements manuels
- Sauvegardez vos données localStorage avant de tout supprimer
*/

console.log('✅ Module migration Firestore chargé');
