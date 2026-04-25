import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Bangladeshi organizational structure data
const bangladeshiStructure = {
  divisions: [
    {
      name: 'Dhaka',
      cities: [
        {
          name: 'Dhaka',
          thanas: [
            {
              name: 'Gulshan',
              wards: [
                { wardNumber: 1, unitName: 'Gulshan Unity Hub' },
                { wardNumber: 2, unitName: 'Gulshan District Center' },
                { wardNumber: 3, unitName: 'Gulshan Community Unit' },
              ],
            },
            {
              name: 'Banani',
              wards: [
                { wardNumber: 1, unitName: 'Banani Primary Unit' },
                { wardNumber: 2, unitName: 'Banani Secondary Unit' },
              ],
            },
            {
              name: 'Dhanmondi',
              wards: [
                { wardNumber: 1, unitName: 'Dhanmondi Education Hub' },
                { wardNumber: 2, unitName: 'Dhanmondi Social Unit' },
              ],
            },
          ],
        },
        {
          name: 'Narayanganj',
          thanas: [
            {
              name: 'Narayanganj Sadar',
              wards: [
                { wardNumber: 1, unitName: 'Narayanganj Central Unit' },
                { wardNumber: 2, unitName: 'Narayanganj East Unit' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Chittagong',
      cities: [
        {
          name: 'Chittagong',
          thanas: [
            {
              name: 'Chawkbazar',
              wards: [
                { wardNumber: 1, unitName: 'Chawkbazar Unit Alpha' },
                { wardNumber: 2, unitName: 'Chawkbazar Unit Beta' },
              ],
            },
            {
              name: 'Halishahar',
              wards: [
                { wardNumber: 1, unitName: 'Halishahar Main Unit' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Khulna',
      cities: [
        {
          name: 'Khulna',
          thanas: [
            {
              name: 'Khulna Sadar',
              wards: [
                { wardNumber: 1, unitName: 'Khulna Central Unit' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function createPermissions() {
  const permissions = [
    { resource: 'users', action: 'create', description: 'Create new users' },
    { resource: 'users', action: 'read', description: 'Read user information' },
    { resource: 'users', action: 'update', description: 'Update user information' },
    { resource: 'users', action: 'delete', description: 'Delete users' },

    { resource: 'activities', action: 'create', description: 'Create activities' },
    { resource: 'activities', action: 'read', description: 'Read activities' },
    { resource: 'activities', action: 'update', description: 'Update activities' },
    { resource: 'activities', action: 'delete', description: 'Delete activities' },

    { resource: 'reports', action: 'create', description: 'Create reports' },
    { resource: 'reports', action: 'read', description: 'Read reports' },
    { resource: 'reports', action: 'update', description: 'Update reports' },
    { resource: 'reports', action: 'delete', description: 'Delete reports' },

    { resource: 'organization', action: 'read', description: 'Read organization data' },
    { resource: 'organization', action: 'update', description: 'Update organization data' },
  ];

  const createdPermissions = [];
  for (const perm of permissions) {
    const existing = await prisma.permission.findUnique({
      where: { resource_action: { resource: perm.resource, action: perm.action } },
    });
    if (!existing) {
      const created = await prisma.permission.create({
        data: perm,
      });
      createdPermissions.push(created);
    } else {
      createdPermissions.push(existing);
    }
  }
  return createdPermissions;
}

async function createOrganizationHierarchy() {
  const permissions = await prisma.permission.findMany();

  // Create Central Organization
  const centralOrg = await prisma.organization.create({
    data: {
      name: 'BJI OMS Central',
      type: 'CENTRAL',
      division: 'National',
    },
  });

  // Create Central Admin Role
  const centralAdminRole = await prisma.role.create({
    data: {
      name: 'Central Admin',
      description: 'Administrator at central level with full permissions',
      organizationId: centralOrg.id,
      permissions: {
        connect: permissions.map(p => ({ id: p.id })),
      },
    },
  });

  // Create Central User
  const centralUser = await prisma.user.create({
    data: {
      email: 'central@bjioms.com',
      password: await hashPassword('Central@123'),
      name: 'Central Administrator',
      phone: '+880170000001',
      organizationId: centralOrg.id,
      roleId: centralAdminRole.id,
      canCreateUsers: true,
    },
  });

  console.log('✓ Created Central Organization with admin user');

  // Create division, city, thana, ward, and unit hierarchy
  for (const division of bangladeshiStructure.divisions) {
    const divisionOrg = await prisma.organization.create({
      data: {
        name: `${division.name} Division`,
        type: 'CITY', // First level after central
        division: division.name,
        parentId: centralOrg.id,
      },
    });

    // Create Division Manager Role
    const divisionManagerRole = await prisma.role.create({
      data: {
        name: `${division.name} Division Manager`,
        description: `Manager for ${division.name} Division`,
        organizationId: divisionOrg.id,
        permissions: {
          connect: permissions.map(p => ({ id: p.id })),
        },
      },
    });

    // Create Division User
    const divisionUser = await prisma.user.create({
      data: {
        email: `city@bjioms.com`,
        password: await hashPassword('City@123'),
        name: `${division.name} City Manager`,
        organizationId: divisionOrg.id,
        roleId: divisionManagerRole.id,
        canCreateUsers: true,
        createdByUserId: centralUser.id,
      },
    });

    console.log(`✓ Created ${division.name} Division with manager`);

    for (const city of division.cities) {
      const cityOrg = await prisma.organization.create({
        data: {
          name: `${city.name} City`,
          type: 'CITY',
          division: division.name,
          city: city.name,
          parentId: divisionOrg.id,
        },
      });

      // Create City Officer Role
      const cityOfficerRole = await prisma.role.create({
        data: {
          name: `${city.name} City Officer`,
          description: `Officer for ${city.name} city`,
          organizationId: cityOrg.id,
          permissions: {
            connect: permissions
              .filter(p =>
                ['users', 'activities', 'reports', 'organization'].includes(p.resource)
              )
              .map(p => ({ id: p.id })),
          },
        },
      });

      // Create City User
      const cityUser = await prisma.user.create({
        data: {
          email: `city@bjioms.com`,
          password: await hashPassword('City@123'),
          name: `${city.name} City Officer`,
          organizationId: cityOrg.id,
          roleId: cityOfficerRole.id,
          canCreateUsers: true,
          createdByUserId: divisionUser.id,
        },
      });

      console.log(`  ✓ Created ${city.name} City`);

      for (const thana of city.thanas) {
        const thanaOrg = await prisma.organization.create({
          data: {
            name: `${thana.name} Thana`,
            type: 'THANA',
            division: division.name,
            city: city.name,
            thana: thana.name,
            parentId: cityOrg.id,
          },
        });

        // Create Thana Officer Role
        const thanaOfficerRole = await prisma.role.create({
          data: {
            name: `${thana.name} Thana Officer`,
            description: `Officer for ${thana.name} thana`,
            organizationId: thanaOrg.id,
            permissions: {
              connect: permissions
                .filter(p =>
                  ['activities', 'reports', 'organization'].includes(p.resource) &&
                  p.action !== 'delete'
                )
                .map(p => ({ id: p.id })),
            },
          },
        });

        // Create Thana User
        const thanaUser = await prisma.user.create({
          data: {
            email: `thana@bjioms.com`,
            password: await hashPassword('Thana@123'),
            name: `${thana.name} Thana Officer`,
            organizationId: thanaOrg.id,
            roleId: thanaOfficerRole.id,
            canCreateUsers: true,
            createdByUserId: cityUser.id,
          },
        });

        console.log(`    ✓ Created ${thana.name} Thana`);

        for (const ward of thana.wards) {
          const wardOrg = await prisma.organization.create({
            data: {
              name: `${thana.name} Ward ${ward.wardNumber}`,
              type: 'WARD',
              division: division.name,
              city: city.name,
              thana: thana.name,
              wardNumber: ward.wardNumber,
              parentId: thanaOrg.id,
            },
          });

          // Create Ward Coordinator Role
          const wardCoordinatorRole = await prisma.role.create({
            data: {
              name: `Ward ${ward.wardNumber} Coordinator`,
              description: `Coordinator for Ward ${ward.wardNumber}`,
              organizationId: wardOrg.id,
              permissions: {
                connect: permissions
                  .filter(p =>
                    ['activities', 'reports'].includes(p.resource) &&
                    ['create', 'read', 'update'].includes(p.action)
                  )
                  .map(p => ({ id: p.id })),
              },
            },
          });

          // Create Ward User
          const wardUser = await prisma.user.create({
            data: {
              email: `ward@bjioms.com`,
              password: await hashPassword('Ward@123'),
              name: `${thana.name} Ward ${ward.wardNumber} Coordinator`,
              organizationId: wardOrg.id,
              roleId: wardCoordinatorRole.id,
              canCreateUsers: false,
              createdByUserId: thanaUser.id,
            },
          });

          console.log(`      ✓ Created Ward ${ward.wardNumber}`);

          // Create Unit
          const unitOrg = await prisma.organization.create({
            data: {
              name: ward.unitName,
              type: 'UNIT',
              division: division.name,
              city: city.name,
              thana: thana.name,
              wardNumber: ward.wardNumber,
              parentId: wardOrg.id,
            },
          });

          // Create Unit Member Role
          const unitMemberRole = await prisma.role.create({
            data: {
              name: `Unit Member - ${ward.unitName}`,
              description: `Member in ${ward.unitName}`,
              organizationId: unitOrg.id,
              permissions: {
                connect: permissions
                  .filter(p =>
                    ['activities', 'reports'].includes(p.resource) &&
                    ['read', 'create'].includes(p.action)
                  )
                  .map(p => ({ id: p.id })),
              },
            },
          });

          // Create Unit User
          const unitUser = await prisma.user.create({
            data: {
              email: `unit@bjioms.com`,
              password: await hashPassword('Unit@123'),
              name: `${ward.unitName} Member`,
              organizationId: unitOrg.id,
              roleId: unitMemberRole.id,
              canCreateUsers: false,
              createdByUserId: wardUser.id,
            },
          });

          console.log(`        ✓ Created Unit: ${ward.unitName}`);
        }
      }
    }
  }
}

async function main() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Clear existing data
    await prisma.activity.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.permission.deleteMany({});
    await prisma.organization.deleteMany({});

    console.log('📊 Creating permissions...');
    await createPermissions();
    console.log('✓ Permissions created\n');

    console.log('🏛️  Creating organizational hierarchy...\n');
    await createOrganizationHierarchy();

    console.log('\n✅ Database seed completed successfully!');
    console.log('\n📝 Demo User Credentials:');
    console.log('═══════════════════════════════════════');
    console.log('Central Admin:');
    console.log('  Email: central@bjioms.com');
    console.log('  Password: Central@123');
    console.log('\nCity Manager:');
    console.log('  Email: city@bjioms.com');
    console.log('  Password: City@123');
    console.log('\nThana Officer:');
    console.log('  Email: thana@bjioms.com');
    console.log('  Password: Thana@123');
    console.log('\nWard Coordinator:');
    console.log('  Email: ward@bjioms.com');
    console.log('  Password: Ward@123');
    console.log('\nUnit Member:');
    console.log('  Email: unit@bjioms.com');
    console.log('  Password: Unit@123');
    console.log('═══════════════════════════════════════');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
