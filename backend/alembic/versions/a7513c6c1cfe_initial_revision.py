"""Initial revision

Revision ID: a7513c6c1cfe
Revises:
Create Date: 2021-03-25 23:45:17.237271

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = "a7513c6c1cfe"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "tags",
        sa.Column("name", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("name"),
    )
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("password_hashed", sa.String(), nullable=False),
        sa.Column("is_superuser", sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("username"),
    )
    op.create_table(
        "links",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("url", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("archived", sa.Boolean(), nullable=False),
        sa.Column("liked", sa.Boolean(), nullable=False),
        sa.Column("date_added", sa.DateTime(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "link_to_tag",
        sa.Column("link_id", sa.Integer(), nullable=True),
        sa.Column("tag_name", sa.String(), nullable=True),
        sa.ForeignKeyConstraint(
            ["link_id"],
            ["links.id"],
        ),
        sa.ForeignKeyConstraint(
            ["tag_name"],
            ["tags.name"],
        ),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("link_to_tag")
    op.drop_table("links")
    op.drop_table("users")
    op.drop_table("tags")
    # ### end Alembic commands ###